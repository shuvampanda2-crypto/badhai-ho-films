import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import GalleryLib "../lib/Gallery";
import Types "../types";

mixin (
  accessControlState : AccessControl.AccessControlState,
  galleryState : GalleryLib.State,
) {
  // Public: get all gallery images
  public query func getGalleryImages() : async [Types.GalleryImage] {
    GalleryLib.getAll(galleryState);
  };

  // Public: get images by category
  public query func getGalleryImagesByCategory(category : Text) : async [Types.GalleryImage] {
    GalleryLib.getByCategory(galleryState, category);
  };

  // Admin-only: create a gallery image
  public shared ({ caller }) func createGalleryImage(input : Types.GalleryImageInput) : async Types.GalleryImage {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    GalleryLib.create(galleryState, input);
  };

  // Admin-only: update a gallery image
  public shared ({ caller }) func updateGalleryImage(id : Types.GalleryImageId, input : Types.GalleryImageInput) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    GalleryLib.update(galleryState, id, input);
  };

  // Admin-only: delete a gallery image
  public shared ({ caller }) func deleteGalleryImage(id : Types.GalleryImageId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    GalleryLib.delete(galleryState, id);
  };
};
