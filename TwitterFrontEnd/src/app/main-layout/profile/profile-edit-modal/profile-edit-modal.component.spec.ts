import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { UserService } from 'src/services/user.service';
import { MockUserInfo } from 'src/testObjects/MockUserInfo';
import { MockUserProfileCard } from 'src/testObjects/MockUserProfileCard';

import { ProfileEditModalComponent } from './profile-edit-modal.component';

describe('ProfileEditModalComponent', () => {
  let component: ProfileEditModalComponent;
  let fixture: ComponentFixture<ProfileEditModalComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockNgbModal: jasmine.SpyObj<NgbModal>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockUserProfileCard: MockUserProfileCard;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getAuthenticatedUserInfos']);
    const ngbModalSpyObj = jasmine.createSpyObj('NgbModal', ['open']);
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['updateProfile']);
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', ['setLoadingFlag']);

    await TestBed.configureTestingModule({
      declarations: [ProfileEditModalComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authServiceSpyObj },
        { provide: NgbModal, useValue: ngbModalSpyObj },
        { provide: DataService, useValue: dataServiceSpyObj },
      ],
    })
      .overrideProvider(UserService, { useValue: userServiceSpyObj })
      .compileComponents();

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    mockNgbModal = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
    mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditModalComponent);
    component = fixture.componentInstance;
    mockUserProfileCard = new MockUserProfileCard();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should call profile edit form creation', () => {
    const editFormSpy = spyOn(component, 'createEditForm');
    editFormSpy.and.callThrough();
    component.userProfileCard = mockUserProfileCard;
    fixture.detectChanges();
    expect(editFormSpy).toHaveBeenCalled();
  });

  it('#createEditForm checking form creation', () => {
    const editFormSpy = spyOn(component, 'createEditForm');
    editFormSpy.and.callThrough();
    component.userProfileCard = mockUserProfileCard;
    fixture.detectChanges();
    const editFormValues = {
      fullname: component.userProfileCard.fullname,
      personalInfo: component.userProfileCard.personalInfo,
      location: component.userProfileCard.location,
      personalWebSiteURL: component.userProfileCard.personalWebSiteURL,
      profilePic: null,
      bgImage: null,
    };
    expect(component.profileEditForm.value).toEqual(editFormValues);
    expect(editFormSpy).toHaveBeenCalled();
  });

  it('#open should call modal open method', () => {
    component.userProfileCard = mockUserProfileCard;
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
    component.userProfileCard = mockUserProfileCard;
    fixture.detectChanges();
    component.open();
    const mockUserInfo = new MockUserInfo();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    mockUserService.updateProfile.and.returnValue(of(new HttpResponse({ status: 200 })));
    const editForm = component.profileEditForm;
    editForm.controls.fullname.setValue('mockFullname');
    editForm.controls.personalInfo.setValue('mockPersonalInfo');
    editForm.controls.personalWebSiteURL.setValue('mockURL');
    editForm.controls.location.setValue('mockLocation');
    editForm.controls.profilePic.setValue(null);
    editForm.controls.bgImage.setValue(null);
    component.editProfile();
    expect(mockDataService.setLoadingFlag).toHaveBeenCalled();
  });

  it('#editProfile should display alert when request fails', () => {
    component.userProfileCard = mockUserProfileCard;
    fixture.detectChanges();
    spyOn(window, 'alert');
    const mockUserInfo = new MockUserInfo();
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(mockUserInfo);
    mockUserService.updateProfile.and.returnValue(throwError(new HttpResponse({ status: 400 })));
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

  it('#editProfile should display alert when #getAuthenticatedUserInfos returns null', () => {
    spyOn(window, 'alert');
    mockAuthService.getAuthenticatedUserInfos.and.returnValue(null);
    component.editProfile();
    expect(window.alert).toHaveBeenCalledWith('Local storage error');
  });
});
