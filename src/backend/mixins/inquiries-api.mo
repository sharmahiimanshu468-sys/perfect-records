import List "mo:core/List";
import Result "mo:core/Result";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/inquiries";
import InquiriesLib "../lib/inquiries";

mixin (
  accessControlState : AccessControl.AccessControlState,
  inquiries : List.List<Types.Inquiry>,
  nextInquiryId : { var value : Nat },
) {
  public shared ({ caller }) func submitInquiry(input : Types.InquiryInput) : async Result.Result<Types.Inquiry, Types.InquiryError> {
    ignore caller;
    if (input.name.size() == 0) {
      return #err(#invalidName);
    };
    if (not input.email.contains(#text "@")) {
      return #err(#invalidEmail);
    };
    if (input.message.size() == 0) {
      return #err(#invalidMessage);
    };
    #ok(InquiriesLib.submitInquiry(inquiries, nextInquiryId, input));
  };

  public query ({ caller }) func listInquiries() : async [Types.Inquiry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    InquiriesLib.listInquiries(inquiries);
  };
};
