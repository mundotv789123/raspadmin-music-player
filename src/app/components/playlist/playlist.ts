import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FileDTO } from '../../services/models/files-model';

@Component({
  selector: 'app-playlist',
  imports: [FontAwesomeModule],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css'
})
export class PlaylistComponent {
  faVolumeHigh=faVolumeHigh

  playing = input<FileDTO | null>();
  playlist = input<Array<FileDTO>>();

  click = output<FileDTO>()

  handlerClose() {
    
  }

  handlerClick(file: FileDTO) {
    this.click.emit(file);
  }

  preventDefault(e: MouseEvent) {
    e.preventDefault();
  }
}
