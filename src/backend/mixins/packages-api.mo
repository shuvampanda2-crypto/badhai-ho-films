import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PackagesLib "../lib/Packages";
import Types "../types";

mixin (
  accessControlState : AccessControl.AccessControlState,
  packagesState : PackagesLib.State,
) {
  // Public: get all packages
  public query func getPackages() : async [Types.Package] {
    PackagesLib.getAll(packagesState);
  };

  // Admin-only: create a package
  public shared ({ caller }) func createPackage(input : Types.PackageInput) : async Types.Package {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    PackagesLib.create(packagesState, input);
  };

  // Admin-only: update a package
  public shared ({ caller }) func updatePackage(id : Types.PackageId, input : Types.PackageInput) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    PackagesLib.update(packagesState, id, input);
  };

  // Admin-only: delete a package
  public shared ({ caller }) func deletePackage(id : Types.PackageId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    PackagesLib.delete(packagesState, id);
  };
};
