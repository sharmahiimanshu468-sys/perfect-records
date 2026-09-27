import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  type ProjectType = {
    #videoEditing;
    #posterDesign;
    #fullTrackProduction;
    #devotionalSpiritual;
    #customComposition;
    #mixingMastering;
    #other;
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    projectType : ProjectType;
    message : Text;
    createdAt : Nat;
  };

  public type OldActor = {};

  public type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    inquiries : List.List<Inquiry>;
    nextInquiryId : { var value : Nat };
  };

  public func migration(_ : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      inquiries = List.empty();
      nextInquiryId = { var value = 0 };
    };
  };
};
