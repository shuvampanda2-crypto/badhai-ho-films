import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import TestimonialsLib "../lib/Testimonials";
import Types "../types";

mixin (
  accessControlState : AccessControl.AccessControlState,
  testimonialsState : TestimonialsLib.State,
) {
  // Public: get all testimonials
  public query func getTestimonials() : async [Types.Testimonial] {
    TestimonialsLib.getAll(testimonialsState);
  };

  // Public: get featured testimonials
  public query func getFeaturedTestimonials() : async [Types.Testimonial] {
    TestimonialsLib.getFeatured(testimonialsState);
  };

  // Admin-only: create a testimonial
  public shared ({ caller }) func createTestimonial(input : Types.TestimonialInput) : async Types.Testimonial {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    TestimonialsLib.create(testimonialsState, input);
  };

  // Admin-only: update a testimonial
  public shared ({ caller }) func updateTestimonial(id : Types.TestimonialId, input : Types.TestimonialInput) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    TestimonialsLib.update(testimonialsState, id, input);
  };

  // Admin-only: delete a testimonial
  public shared ({ caller }) func deleteTestimonial(id : Types.TestimonialId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    TestimonialsLib.delete(testimonialsState, id);
  };
};
