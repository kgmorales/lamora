import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { PaprikaService } from 'src/app/services/paprika.service';
// import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(
    // private tutorialService: TutorialService,
    private paprikaService: PaprikaService
  ) {
    this.paprikaService.getAll().subscribe((recipes) => console.log(recipes));
  }

  // ngOnInit(): void {
  //   this.retrieveTutorials();
  // }

  //   retrieveTutorials(): void {
  //     this.tutorialService.getAll().subscribe({
  //       next: (data) => {
  //         this.tutorials = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e),
  //     });
  //   }

  //   refreshList(): void {
  //     this.retrieveTutorials();
  //     this.currentTutorial = {};
  //     this.currentIndex = -1;
  //   }

  //   setActiveTutorial(tutorial: Tutorial, index: number): void {
  //     this.currentTutorial = tutorial;
  //     this.currentIndex = index;
  //   }

  //   removeAllTutorials(): void {
  //     this.tutorialService.deleteAll().subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.refreshList();
  //       },
  //       error: (e) => console.error(e),
  //     });
  //   }

  //   searchTitle(): void {
  //     this.currentTutorial = {};
  //     this.currentIndex = -1;

  //     this.tutorialService.findByTitle(this.title).subscribe({
  //       next: (data) => {
  //         this.tutorials = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e),
  //     });
  //   }
}
