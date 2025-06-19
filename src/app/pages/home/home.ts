import { Component, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBackwardFast, faBars, faEyeSlash, faForwardFast, faPause, faShuffle, faVolumeHigh, faVolumeMute, faXmark } from '@fortawesome/free-solid-svg-icons';
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
  faBackwardFast = faBackwardFast
  faPause = faPause
  faForwardFast = faForwardFast
  faShuffle = faShuffle
  faVolumeHigh = faVolumeHigh
  faEyeSlash = faEyeSlash
  faBars = faBars
  faXmark = faXmark

  playlist: Array<FileDTO> = []
  file: FileDTO | null = null;

  isLoading = signal(true);
  loginForm = signal(false);

  controls = {
    volume: 0.5
  }

  constructor(private filesServie: FilesService) {

  }

  playAudio(file: FileDTO) {

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
        //TODO erro
      }
    }).finally(() => {
      this.isLoading.set(false);
    })
  }

  isAudio(type: string) {
    return type.match(/audio\/(mpeg|mp3|ogg|(x-(pn-)?)?wav)/);
  }
}
