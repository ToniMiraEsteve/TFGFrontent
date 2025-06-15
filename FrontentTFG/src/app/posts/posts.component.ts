import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';
import { RespuestasService } from '../services/respuestas.service';
import { Respuesta } from '../models/respuesta';
import { AuthStorage } from '../general/localStorage/auth.stroge';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  nuevoPost: Partial<Post> = {};
  nuevasRespuestas: { [postId: number]: string } = {};
  cargando = false;
  errorMsg = '';

  currentUser: any;
  editandoPost: Post | null = null;

  respuestaEditandoId: number | null = null;
  contenidoRespuestaEditando = '';



  constructor( private postsService: PostsService, private respuestasService: RespuestasService, private authStorage: AuthStorage) { }

  ngOnInit(): void {
    this.currentUser = this.authStorage.getUser();
    this.cargarPosts();
  }

   cargarPosts() {
    this.cargando = true;
    this.postsService.getPosts().subscribe({
      next: res => {
        this.posts = res.data.map((p: Post) => ({ ...p, respuestas: [] }));
        this.posts.forEach(post => {
          this.respuestasService.getRespuestasByPostId(post.id).subscribe({
            next: r => post.respuestas = r.data,
            error: () => post.respuestas = []
          });
        });
        this.cargando = false;
      },
      error: () => {
        this.errorMsg = 'Error cargando posts.';
        this.cargando = false;
      }
    });
  }

  crearPost() {
    if (!this.nuevoPost.contenido?.trim()) {
      this.errorMsg = 'El contenido no puede estar vacío.';
      return;
    }
    this.postsService.createPost(this.nuevoPost).subscribe({
      next: () => {
        this.nuevoPost = {};
        this.cargarPosts();
      },
      error: () => this.errorMsg = 'Error creando post.'
    });
  }

  editar(post: Post) {
    this.editandoPost = { ...post };
  }

  guardarEdicion() {
    if (!this.editandoPost) return;
    this.postsService.updatePost(this.editandoPost).subscribe({
      next: () => {
        this.editandoPost = null;
        this.cargarPosts();
      },
      error: () => this.errorMsg = 'Error actualizando post.'
    });
  }

  cancelarEdicion() {
    this.editandoPost = null;
  }

  borrarPost(id: number) {
    this.postsService.deletePost(id).subscribe({
      next: () => this.cargarPosts(),
      error: () => this.errorMsg = 'Error borrando post.'
    });
  }

  enviarRespuesta(post: Post) {
    const contenido = this.nuevasRespuestas[post.id];
    if (!contenido?.trim()) return;
    this.respuestasService.createRespuesta({ post_id: post.id, contenido }).subscribe({
      next: r => {
        post.respuestas = post.respuestas || [];
        post.respuestas.push(r.data);
        this.nuevasRespuestas[post.id] = '';
      },
      error: () => this.errorMsg = 'Error enviando respuesta.'
    });
  }

  editarRespuesta(r: Respuesta) {
    this.respuestaEditandoId = r.id;
    this.contenidoRespuestaEditando = r.contenido;
  }

  guardarEdicionRespuesta(post: Post) {
    if (!this.respuestaEditandoId) return;
  
    this.respuestasService.updateRespuesta({
      id: this.respuestaEditandoId,
      contenido: this.contenidoRespuestaEditando
    } as Respuesta).subscribe({
      next: res => {
        const idx = post.respuestas.findIndex(r => r.id === this.respuestaEditandoId);
        if (idx !== -1) post.respuestas[idx] = res.data;
        this.respuestaEditandoId = null;
        this.contenidoRespuestaEditando = '';
      },
      error: () => this.errorMsg = 'Error editando respuesta.'
    });
  }
  

  cancelarEdicionRespuesta() {
    this.respuestaEditandoId = null;
    this.contenidoRespuestaEditando = '';
  }

  borrarRespuesta(id: number) {
    this.respuestasService.borrarRespuesta(id).subscribe({
      next: () => {
        this.posts.forEach(post => {
          post.respuestas = post.respuestas.filter(r => r.id !== id);
        });
      },
      error: () => this.errorMsg = 'Error borrando respuesta.'
    });
  }

  esAutorPost(post: Post) {
    return post.usuario?.id === this.currentUser?.id;
  }
  esAutorRespuesta(r: Respuesta) {
    return r.usuario?.id === this.currentUser?.id;
  }
  esAdmin() {
    return this.currentUser?.rol === 'admin';
  }
}
