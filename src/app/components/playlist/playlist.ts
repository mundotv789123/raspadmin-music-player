import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FileDTO } from '../../services/models/files-model';

@Component({
  selector: 'app-playlist',
  imports: [FontAwesomeModule],
  templateUrl: './playlist.html'
})
export class PlaylistComponent {
  faVolumeHigh=faVolumeHigh

  playing = input<FileDTO | null>();
  playlist = input<Array<FileDTO>>();

  clickmusic = output<FileDTO>()

  handlerClick(file: FileDTO) {
    this.clickmusic.emit(file);
  }

  preventDefault(e: MouseEvent) {
    e.preventDefault();
  }
}
