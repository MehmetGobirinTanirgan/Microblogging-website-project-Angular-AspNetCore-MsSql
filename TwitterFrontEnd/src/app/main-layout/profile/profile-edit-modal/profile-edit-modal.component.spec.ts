import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';

import { ProfileEditModalComponent } from './profile-edit-modal.component';

describe('ProfileEditModalComponent', () => {
  let component: ProfileEditModalComponent;
  let fixture: ComponentFixture<ProfileEditModalComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockNgbModal: jasmine.SpyObj<NgbModal>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockUserProfileCard:any;
  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    const ngbModalSpyObj = jasmine.createSpyObj('NgbModal', ['open']);
    const userServiceSpyObj = jasmine.createSpyObj('UserService', [
      'updateProfile',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ProfileEditModalComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: NgbModal, useValue: ngbModalSpyObj }
      ],
    })
      .overrideProvider(UserService, { useValue: userServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    mockNgbModal = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
    mockUserService = TestBed.inject(
      UserService
    ) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditModalComponent);
    component = fixture.componentInstance;
    mockUserProfileCard = {
      id: 'mockID',
      createdDate: new Date(),
      fullname: 'mockFullname',
      username: 'mockUsername',
      personalInfo: 'mockPersonalInfo',
      location: 'mockLocation',
      personalWebSiteURL: 'mockPersonalWebSiteURL',
      profilePicPath: 'mockProfilePicPath',
      backgroundPath: 'mockBackgroundPath',
      followerCounter: 1,
      followingCounter: 1,
      followFlag: true,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call form creation', () => {
    const formSpy = spyOn(component, 'createEditForm');
    formSpy.and.callThrough();
    component.profileData = mockUserProfileCard;
    fixture.detectChanges();

    expect(formSpy).toHaveBeenCalled();
  });

  it('#createEditForm checking form creation', () => {
    const formSpy = spyOn(component, 'createEditForm');
    formSpy.and.callThrough();
    component.profileData = mockUserProfileCard;
    fixture.detectChanges();
    const editFormValues = {
      fullname: component.profileData.fullname,
      personalInfo: component.profileData.personalInfo,
      location: component.profileData.location,
      personalWebSiteURL: component.profileData.personalWebSiteURL,
      profilePic: null,
      bgImage: null,
    };

    expect(component.profileEditForm.value).toEqual(editFormValues);
    expect(formSpy).toHaveBeenCalled();
  });

  it('#open should call open method of modal', () => {
    component.profileData = mockUserProfileCard;
    fixture.detectChanges();
    component.open();
    expect(mockNgbModal.open).toHaveBeenCalledWith(component.modalContent);
  });

  it('#addProfilePic should effect #profilePic', () => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([], 'mockFileName'));
    component.addProfilePic(dataTransfer.files);

    expect(component.profilePic.name).toEqual(dataTransfer.files[0].name);
  });

  it('#addBgImage should effect #bgImage', () => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([], 'mockFileName'));
    component.addBgImage(dataTransfer.files);

    expect(component.bgImage.name).toEqual(dataTransfer.files[0].name);
  });

  it('#editProfile should post successfully and close modal', () => {
    component.profileData = mockUserProfileCard;
    fixture.detectChanges();
    component.open();
    spyOn(window,'alert');
    const mockUserData = {
      username: 'mockUsername',
      fullname: 'mockFullname',
      id: 'mockID',
      profilePicPath: 'mockProfilePicPath',
      token: 'mockToken',
    };
    mockAuthService.getUserData.and.returnValue(mockUserData);
    mockUserService.updateProfile.and.returnValue(of(new HttpResponse({status:200})));
    const editForm = component.profileEditForm;
    editForm.controls.fullname.setValue('mockFullname');
    editForm.controls.personalInfo.setValue('mockPersonalInfo');
    editForm.controls.personalWebSiteURL.setValue('mockURL');
    editForm.controls.location.setValue('mockLocation');
    editForm.controls.profilePic.setValue(null);
    editForm.controls.bgImage.setValue(null);
    component.editProfile();

    expect(window.alert).toHaveBeenCalledWith('Profile updated');
  });

  it('#editProfile should display alert when request fails', () => {
    component.profileData = mockUserProfileCard;
    fixture.detectChanges();
    spyOn(window,'alert');
    const mockUserData = {
      username: 'mockUsername',
      fullname: 'mockFullname',
      id: 'mockID',
      profilePicPath: 'mockProfilePicPath',
      token: 'mockToken',
    };
    mockAuthService.getUserData.and.returnValue(mockUserData);
    mockUserService.updateProfile.and.returnValue(throwError(new HttpResponse({status:400})));
    const editForm = component.profileEditForm;
    editForm.controls.fullname.setValue('mockFullname');
    editForm.controls.personalInfo.setValue('mockPersonalInfo');
    editForm.controls.personalWebSiteURL.setValue('mockURL');
    editForm.controls.location.setValue('mockLocation');
    editForm.controls.profilePic.setValue(null);
    editForm.controls.bgImage.setValue(null);
    component.editProfile();

    expect(window.alert).toHaveBeenCalledWith('Profile update failed');
  });

  it('#editProfile should display alert when auth. service returns null', () => {
    spyOn(window,'alert');
    mockAuthService.getUserData.and.returnValue(null);
    component.editProfile();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
  });
});
