import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types";

module {
  public type State = {
    inquiries : List.List<Types.ContactInquiry>;
    counter : { var nextId : Nat };
  };

  public func initState() : State {
    {
      inquiries = List.empty<Types.ContactInquiry>();
      counter = { var nextId = 1 };
    };
  };

  public func submit(state : State, input : Types.InquiryInput) : Types.ContactInquiry {
    let id = state.counter.nextId;
    state.counter.nextId += 1;
    let inquiry : Types.ContactInquiry = {
      id;
      name = input.name;
      email = input.email;
      phone = input.phone;
      eventDate = input.eventDate;
      message = input.message;
      packageInterest = input.packageInterest;
      createdAt = Time.now();
    };
    state.inquiries.add(inquiry);
    inquiry;
  };

  public func getAll(state : State) : [Types.ContactInquiry] {
    state.inquiries.toArray();
  };

  public func getById(state : State, id : Types.InquiryId) : ?Types.ContactInquiry {
    state.inquiries.find(func(i) { i.id == id });
  };

  public func delete(state : State, id : Types.InquiryId) {
    let updated = state.inquiries.filter(func(i) { i.id != id });
    state.inquiries.clear();
    state.inquiries.append(updated);
  };
};
