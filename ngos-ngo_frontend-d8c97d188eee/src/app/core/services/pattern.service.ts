import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  constructor() { }
  addressPattern = "^([a-zA-Z0-9.,&*-_#()/]+[^\s])*[a-zA-Z0-9.,&*-_#()/]+$";
  twitterPattern = "(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?twitter\.com\/[A-z0-9_]+\/?";
  linkedInPattern = "(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.|https:\/\/in\.|http:\/\/in\.)?linkedin\.com(\/in|\/company)\/[A-z0-9_-]*[a-zA-Z0-9/_-]+$";
  facebbokPattern = "(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?(facebook|fb)\.com\/[A-z0-9_.-]+\/?";
  websitePattern = "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$";
  companyNamePattern = "^(?!.*[.&!@#()+-/_*]{2})([a-zA-Z0-9.,&!@#()+-/_*]+[^\s])*[a-zA-Z0-9.,&!@#()+-/_*]+$";
  branchNamePattern = "^(?!.*[!#%_.,@&*-]{2})([a-zA-Z0-9!#%_.,@&*-]+[^\s])*[a-zA-Z0-9!#%_.,@&*-]+$";
  projectNamePattern = "^(?![0-9&._\-])[a-zA-Z0-9&._\-]+(?: [a-zA-Z0-9&._\-]+)*$";
  projectNameMin = 2;
  projectNameMax= 55;
  goalPattern = "[0-9]+(\.[0-9][0-9]?)?";
  emailPattern = "\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})";
  firstNamePattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  lastNamePattern = "^[a-zA-Z]*$";
  // newsTitlePattern = "^(?!.*[\.\&\*\-\_\(\)]{2})([a-zA-Z0-9.&*-_()]+\s)*[a-zA-Z0-9.&*-_()]+$";
  newsTitlePattern = "^(?!.*[.&!@#()+-/_*]{2})([a-zA-Z0-9.,&!@#()+-/_*]+[^\s])*[a-zA-Z0-9.,&!@#()+-/_*]+$";
  eventNamePattern = "^(?!.*[.&!@#()+-/_*]{2})([a-zA-Z0-9.,&!@#()+-/_*]+[^\s])*[a-zA-Z0-9.,&!@#()+-/_*]+$"
  // eventNamePattern = "^(?!.*[\.\&\*\-\_\(\)]{2})([a-zA-Z0-9.&*-_()]+\s)*[a-zA-Z0-9.&*-_()]+$";
  memberNamePattern = "^(?![0-9&._\-])[a-zA-Z0-9&._\-]+(?: [a-zA-Z0-9&._\-]+)*$";
  phoneNumberPattern = "([+]?\d{1,3}[-])?\d{10}";
  newsDescription ="^([a-zA-Z0-9.,&!@#()+-/_*$%^]+[\s])*[a-zA-Z0-9.,&!@#()+-/_*$%^]+$";
  eventDescription ="^([a-zA-Z0-9.,&!@#()+-/_*$%^]+[\s])*[a-zA-Z0-9.,&!@#()+-/_*$%^]+$";
  projectDescription="^([a-zA-Z0-9.,&!@#()+-/_*$%^]+[\s])*[a-zA-Z0-9.,&!@#()+-/_*$%^]+$";
  activityDescription="^([a-zA-Z0-9.,&!@#()+-/_*$%^]+[\s])*[a-zA-Z0-9.,&!@#()+-/_*$%^]+$";
  chapterDescription = "^([a-zA-Z0-9.,&!@#()+-/_*$%^]+[\s])*[a-zA-Z0-9.,&!@#()+-/_*$%^]+$";
  projectDetails="^([a-zA-Z0-9.,&!@#()+-/_*$%^]+[\s])*[a-zA-Z0-9.,&!@#()+-/_*$%^]+$";
  amountReceived="^([0-9-])*$";
  locationName="^^(?![0-9&._\-])[a-zA-Z0-9&._\-]+(?: [a-zA-Z0-9&._\-]+)*$";
  passwordPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}";
  chapterNamePattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  bankNamePattern = "^(?!.*[.&!@#()+-/_*]{2})([a-zA-Z0-9.,&!@#()+-/_*]+[^\s])*[a-zA-Z0-9.,&!@#()+-/_*]+$";



  
  firstNameMinLength = 3;
  firstNameMaxLength = 35;
  lastNameMinLength = 1;
  lastNameMaxLength = 35;
  addressMinLength = 2;
  addressMaxLength = 55;
  cityMinLength = "2";
  cityMaxLength = "55";
  zipcodeMinimumLength = "5";
  zipcodeMaximumLength ="6";
  zipCodePattern = "^[0-9]{5,6}$";
  emailMaxLength = "64";
  phoneNumberMinLength = "10";
  phoneNumberMaxLength = "12";
  websiteMaxLength = "500";
  chapterNameMinLength = 2;
  chapterNameMaxLength = 55;
  locationMinLength = 2;
  locationMaxLength = 55;
  projectDescriptonMaxLength = "500";
  newsDescriptionMaxLength = 500;
  eventDescriptionMaxLength = "500";
  memberNameMinLength = "3";
  memberNameMaxLength = "35";
  companyNameMaxLength = "100";
  accountNameMaxlength = "35";
  accountNameMinlength = "3"
  accountNumberPattern = "[0-9]{9,18}";
  accountNamePattern = "^((?:[A-Za-z]+ ?){1,3})$";
  ifscPattern = "^[A-Za-z]{4}[a-zA-Z0-9]{7}$";
  usaaccountNumberPattern = "[0-9]{10,12}";
  usaRoutingNumberPattern = "[0-9]{9}";

  positiveNumbersPattern = "^[0-9]*[1-9][0-9]*$";
  activityDescriptionMinLength = 3;
  activityDescriptionMaxLength = 500;
  chapterDescriptionMinLength = 3;
  chapterDescriptionMaxLength = 500;
  




  errorMessageCompanyNameReq = "Company Name is Required";
  errorMessageCompanyNameInvalid = "Company Name is Invalid";
  errorMessageCompanyNameMaxLength = "Company Name is Reached the Maximum Length";
  errorMessageFirstNameReq = "First Name is Required";
  errorMessageFirstNameInvalid = "First Name is Invalid";
  errorMessageFirstNameMinMax = "First Name should be 3 to 35 characters only";
  errorMessagelastNameReq = "Last Name is Required";
  errorMessagelastNameInvalid = "Last Name is Invalid";
  errorMessagelastNameMinMax = "Last Name should be 3 to 35 characters only";
  errorMessageAddressReq = "Address is Required";
  errorMessageAddressInvalid = "Address is Invalid";
  errorMessageAddressMinMax = "Address should be 2 to 55 characters only";
  errorMessageCityReq = "City is Required";
  errorMessageCityMinMax = "City should be 2 to 55 characters only";
  errorMessageCountryReq = "Country is Required";
  errorMessageZipCodeReq = "ZipCode is Required";
  errorMessageZipCodeInvalid = "ZipCode is Invalid";
  errorMessagePhnoReq = "Phone Number is Required";
  errorMessagePhnoInvalid = "Phone Number is Invalid";
  errorMessageEmailReq = "Email is Required";
  errorMessageEmailInvalid = "Email is Invalid";
  errorMessageEmailMaxLength = "Email is Reached the Maximum Length";
  errorMessageReferedByReq = "Refered By is Required";
  errorMessagePasswordReq = "Password is Required";
  errorMessageSalutationReq = "Salutation is Required";
  errorMessagePreferredPhNoReq = "Preferred Phone is required";
  errorMessagePreferredEmailReq = "Preferred Email is required";
  errorMessageStreetReq = "Street is required";
  errorMessageStateReq = "State is required";
  errorMessageAccountNumberReq = "Account Number is required";
  errorMessageAccountNumberInvalid= "Number must be between 9 and 18 characters long.";
  errorMessageUSAAccountNumberInvalid= "Number must be between 10 and 12 characters long.";
  errorMessageUSARoutingNumberInvalid= "Number must be 9 characters long.";
  errorMessageAccountNameReq = "Account holder's name is required";
  errorMessageAccountNameInvalid = "Account holder's name is Invalid";
  errorMessageBankNameReq = "Bank Name is required";
  errorMessageBankNameKInvalid = "Bank Name is Invalid";
  errorMessageChapterNameReq = "Chapter Name is required";
  errorMessageChapterNameInvalid = "Chapter Name is Invalid";
  errorMessageChapterMinMax = "The minimum and maximum characters should be 2 and 55 respectively.";
  errorMessageIFSCcodeReq = "IFSC Code  is required";
  errorMessageIFSCcodeInvalid = "IFSC Code  is Invalid";


  errorMessageProjectNameReq = "Project Name is required.";
  errorMessageProjectNameInvalid = "Enter Valid Project Name";
  errorMessageProjectNameMinMax = "The minimum and maximum characters should be 2 and 55 respectively.";
  errorMessageProjectTypeReq = "Project type is required.";
  errorMessageGoalReq = "Goal is required.";
  errorMessageLocationReq = "Location is required.";
  errorMessageLocationInvalid = "Location is Invalid.";
  errorMessageLocationMinMax = "Location should be 2 to 55 characters only";
  errorMessageDescriptionReq = "Description is required.";
  errorMessageDescriptionMinMax = "The minimum characters should be 3.";
  errorMessageDonationReq = "Donation is required.";

  errorMessageActivatyReq = "Activity is required.";
  errorMessageAmountReq = "Amount is required.";
  errorMessageAmountInvalid = "Enter a valid Amount, Only two digits after decimal is accepted.";
  
  errorMessageTitleReq = "Title is required.";
  errorMessageTitleInvalid = "Title is Invalid.";
  errorMessageDescriptionInvalid = "Description is invalid.";
  errorMessageDescriptionMaxLimit = "The minimum and maximum characters should be 3 and 500 respectively.";
  errorMessageImageReq = "Image is required.";

  errorMessageName = "Name is required.";
  errorMessageModeOfDonations = "Mode of Donation is required.";
  errorMessageChapterAdminUSA = "Chapter Admin USA is required.";
  errorMessageChapterAdminIndia = "Chapter Admin India is required.";
  





       
}
