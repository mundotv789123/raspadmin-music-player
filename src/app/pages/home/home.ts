import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBackwardFast, faBars, faEyeSlash, faForwardFast, faPause, faShuffle, faVolumeHigh, faVolumeMute, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  faVolumeMute=faVolumeMute
  faBackwardFast=faBackwardFast
  faPause=faPause
  faForwardFast=faForwardFast
  faShuffle=faShuffle
  faVolumeHigh=faVolumeHigh
  faEyeSlash=faEyeSlash
  faBars=faBars
  faXmark=faXmark
}
