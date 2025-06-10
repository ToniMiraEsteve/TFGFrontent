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
  editandoPost: Post | null = null;
  currentUser: any; 




  constructor( private postsService: PostsService, private respuestasService: RespuestasService, private authStorage: AuthStorage) { }

  ngOnInit(): void {
    this.currentUser = this.authStorage.getUser();
    this.cargarPosts();
  }

  cargarPosts() {
    this.cargando = true;
    this.postsService.getPosts().subscribe({
      next: (response) => {
        this.posts = response.data.map((post: Post) => ({
          ...post,
          respuestas: []
        }));
  
        this.posts.forEach(post => {
          this.respuestasService.getRespuestasByPostId(post.id).subscribe({
            next: (respuestas) => {
              post.respuestas = respuestas.data;
            }
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
    if (!this.nuevoPost.contenido || this.nuevoPost.contenido.trim().length === 0) {
      this.errorMsg = 'El contenido del post no puede estar vacío.';
      return;
    }
  
    this.postsService.createPost(this.nuevoPost).subscribe({
      next: () => {
        this.nuevoPost = {};
        this.errorMsg = '';
        this.cargarPosts();
      },
      error: (error) => {
        console.error('Error creando post:', error);
        this.errorMsg = 'Error creando post. Intenta de nuevo más tarde.';
      }
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

    this.respuestasService.createRespuesta({
      post_id: post.id,
      contenido: contenido
    }).subscribe({
      next: (respuesta) => {
        console.log('Respuesta: ' + respuesta)
        post.respuestas = post.respuestas || [];
        post.respuestas.push(respuesta.data);
        this.nuevasRespuestas[post.id] = '';
      },
      error: () => this.errorMsg = 'Error enviando respuesta.'
    });
  }

}
