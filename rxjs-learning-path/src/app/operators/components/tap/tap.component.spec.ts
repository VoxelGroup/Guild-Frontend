import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import { TapComponent } from './tap.component';
import {provideHighlightOptions} from 'ngx-highlightjs';
import {MockProvider} from 'ng-mocks';
import {UserService} from '../../../services/user.service';
import {EMPTY, of} from 'rxjs';
import {UserData} from '../../../models/user';

describe('TapComponent', () => {
  let component: TapComponent;
  let fixture: ComponentFixture<TapComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TapComponent],
      providers: [
        MockProvider(UserService, {getUser: () => EMPTY }),
        provideHighlightOptions({
          fullLibraryLoader: () => import('highlight.js')
        })
      ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(TapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store the user into user property', fakeAsync(() => {
    const user: UserData = {
      id: "E1FA1D68-8783-460C-ABC0-A11BA71CD36C",
      name: "John Doe",
      role:  "User"
    };
    spyOn(userService, 'getUser').and.returnValue(of(user));
    spyOn(console, 'log');

    component.ngOnInit();
    flush();

    expect(component.user).toEqual(user);
    expect(console.log).toHaveBeenCalledWith(user);
  }));
});
