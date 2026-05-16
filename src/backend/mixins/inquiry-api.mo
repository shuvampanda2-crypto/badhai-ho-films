import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import InquiryLib "../lib/Inquiries";
import Types "../types";

mixin (
  accessControlState : AccessControl.AccessControlState,
  inquiryState : InquiryLib.State,
) {
  // Public: anyone can submit a contact inquiry
  public shared func submitInquiry(input : Types.InquiryInput) : async Types.ContactInquiry {
    InquiryLib.submit(inquiryState, input);
  };

  // Admin-only: retrieve all inquiries
  public shared query ({ caller }) func getInquiries() : async [Types.ContactInquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    InquiryLib.getAll(inquiryState);
  };

  // Admin-only: delete an inquiry
  public shared ({ caller }) func deleteInquiry(id : Types.InquiryId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    InquiryLib.delete(inquiryState, id);
  };
};
