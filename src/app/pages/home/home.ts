import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBackward, 
  faBars, 
  faEyeSlash, 
  faForward, 
  faPause, 
  faPlay, 
  faShuffle, 
  faVolumeHigh, 
  faVolumeMute, 
  faXmark 
} from '@fortawesome/free-solid-svg-icons';
import { PlaylistComponent } from "../../components/playlist/playlist";
import { FileDTO } from '../../services/models/files-model';
import { Range } from "../../elements/range/range";
import { FilesService } from '../../services/files-service';
import { Login } from "../../components/login/login";

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, PlaylistComponent, Range, Login],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  faVolumeMute = faVolumeMute
  faBackward = faBackward
  faForward = faForward
  faPause = faPause
  faPlay=faPlay
  faShuffle = faShuffle
  faVolumeHigh = faVolumeHigh
  faEyeSlash = faEyeSlash
  faBars = faBars
  faXmark = faXmark

  @ViewChild("audioRef") audioRef!: ElementRef<HTMLAudioElement>;

  playlist: Array<FileDTO> = []
  file = signal<FileDTO | null>(null);

  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  loginForm = signal(false);

  audioIsLoading = signal(true);
  audioErrorMessage = signal<string | null>(null);
  audioPaused = signal(true);

  constructor(private filesServie: FilesService) { }

  handlerAudioLoaded() {
    const file = this.file()
    if (!this.audioIsLoading() || !file) {
      return;
    }

    this.audioIsLoading.set(false);
    if (!navigator.mediaSession.metadata) {
      navigator.mediaSession.metadata = new MediaMetadata();
    }
    navigator.mediaSession.metadata.title = file.name;

    navigator.mediaSession.metadata.artwork = [
      {
        src: !file.icon ? "/img/icons/music.svg" : file!.icon,
      },
    ];
    navigator.mediaSession.metadata.album = file?.parent ?? "";
    navigator.mediaSession.setPositionState({
      duration: this.audioRef.nativeElement!.duration
    });

    navigator.mediaSession.setActionHandler("previoustrack", this.backSong);
    navigator.mediaSession.setActionHandler("nexttrack", this.nextSong);
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime) {
        this.audioRef.nativeElement.currentTime = details.seekTime;
      }
    });
  }

  handlerAudioTimeUpdate() {
    const audioElement = this.audioRef.nativeElement;
    if (!audioElement) {
      return;
    }
    navigator.mediaSession.setPositionState({
      duration: audioElement.duration,
      playbackRate: audioElement.playbackRate,
      position: audioElement.currentTime,
    });
    this.audioPaused.set(this.audioRef.nativeElement.paused);
  }

  handlerError() {
    const message = this.audioRef.nativeElement.error?.message;
    this.audioIsLoading.set(false);
    this.audioErrorMessage.set(message ?? "Ocorreu um erro ao reproduzir áudio")
  }

  handlerCloseFile() {
    if (this.audioRef.nativeElement) {
      this.audioRef.nativeElement.src = "";
    }
    this.file.set(null);
  }

  handlerAudioVolumeChange(percent: number) {
    this.audioRef.nativeElement.volume = percent / 100;
  }

  togglePlayAudio() {
    if (!this.audioRef.nativeElement) {
      return;
    }

    if (this.audioErrorMessage()) {
      this.audioRef.nativeElement.load();
      this.audioErrorMessage.set(null);
      this.audioIsLoading.set(true);
      return;
    }

    if (this.audioRef.nativeElement.paused) {
      this.audioRef.nativeElement.play();
    } else {
      this.audioRef.nativeElement.pause();
    }

    this.audioPaused.set(this.audioRef.nativeElement.paused);
  }

  updateAudioPercent(percent: number) {
    const time = this.audioRef.nativeElement.duration * (percent / 100);
    this.audioRef.nativeElement.currentTime = time;
    return true;
  }

  nextSong() {
    const file = this.file();
    const audioPlayList = this.playlist;

    if (!file || !audioPlayList) {
      return;
    }
    this.audioIsLoading.set(true);

    let nextSong = 0;

    const fileE = audioPlayList.filter((f) => f.src == file.src);
    if (fileE.length == 1) {
      nextSong = audioPlayList.indexOf(fileE[0]);
      if (nextSong + 1 >= audioPlayList.length) {
        nextSong = 0;
      } else {
        nextSong++;
      }
    }

    this.file.set(audioPlayList[nextSong])
  }

  backSong() {
    const file = this.file();
    const audioPlayList = this.playlist;

    if (!file || !audioPlayList) {
      return;
    }
    if (this.audioRef.nativeElement.currentTime >= 3) {
      this.audioRef.nativeElement.currentTime = 0;
      return;
    }

    this.audioIsLoading.set(true);

    let backSong = audioPlayList.indexOf(file);
    if (backSong <= 0) {
      backSong = audioPlayList.length - 1;
    } else {
      backSong--;
    }
    this.file.set(audioPlayList[backSong])
  }

  playAudio(file: FileDTO) {
    console.log(file.name)
    if (file.src === this.file()?.src) {
      return;
    }
    this.file.set(file)
  }

  ngOnInit(): void {
    this.filesServie.getFiles(location.hash.substring(1)).then(files => {
      console.log('files', files);
      this.playlist = files.filter(file => file.type && this.isAudio(file.type));
    }).catch(error => {
      console.error(error);
      if (error.status == 401) {
        this.loginForm.set(true);
      } else {
        const defaultMessage = "Ocorreu um erro ao enviar requisição";
        this.errorMessage.set(error.error?.message ?? defaultMessage)
      }
    }).finally(() => {
      this.isLoading.set(false);
    })
  }

  isAudio(type: string) {
    return type.match(/audio\/(mpeg|mp3|ogg|(x-(pn-)?)?wav)/);
  }
}
