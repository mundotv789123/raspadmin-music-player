import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBackwardFast, faBars, faEyeSlash, faForwardFast, faPause, faShuffle, faVolumeHigh, faVolumeMute, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PlaylistComponent } from "../../components/playlist/playlist";
import { FileDTO } from '../../services/models/files-model';
import { Range } from "../../elements/range/range";

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, PlaylistComponent, Range],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
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

  controls = {
    volume: 0.5
  }

  playAudio(file: FileDTO) {

  }
}
