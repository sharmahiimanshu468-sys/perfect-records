module {
  public type InquiryId = Nat;

  public type ProjectType = {
    #videoEditing;
    #posterDesign;
    #fullTrackProduction;
    #devotionalSpiritual;
    #customComposition;
    #mixingMastering;
    #other;
  };

  public type Inquiry = {
    id : InquiryId;
    name : Text;
    email : Text;
    projectType : ProjectType;
    message : Text;
    createdAt : Nat;
  };

  public type InquiryInput = {
    name : Text;
    email : Text;
    projectType : ProjectType;
    message : Text;
  };

  public type InquiryError = {
    #invalidName;
    #invalidEmail;
    #invalidMessage;
  };
};
