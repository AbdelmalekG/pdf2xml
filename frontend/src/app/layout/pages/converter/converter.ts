import { Component } from '@angular/core';

// components
import { Topbar } from '../../components/topbar/topbar';

// features
import { Viewer } from '../../../features/viewer/viewer';
import { Upload } from '../../../features/upload/upload';
import { Download } from '../../../features/download/download';

// material
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-converter',
  imports: [
    Topbar,

    MatCardModule,

    Viewer,
    Upload,
    Download
  ],
  templateUrl: './converter.html',
  styleUrl: './converter.scss',
})
export class Converter {}