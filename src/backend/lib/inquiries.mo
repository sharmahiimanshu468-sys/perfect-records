import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/inquiries";

module {
  public func submitInquiry(
    inquiries : List.List<Types.Inquiry>,
    nextId : { var value : Nat },
    input : Types.InquiryInput,
  ) : Types.Inquiry {
    let inquiry : Types.Inquiry = {
      id = nextId.value;
      name = input.name;
      email = input.email;
      projectType = input.projectType;
      message = input.message;
      createdAt = Int.abs(Time.now());
    };
    nextId.value += 1;
    inquiries.add(inquiry);
    inquiry;
  };

  public func listInquiries(inquiries : List.List<Types.Inquiry>) : [Types.Inquiry] {
    inquiries.toArray();
  };
};
