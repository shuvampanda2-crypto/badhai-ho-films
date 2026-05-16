import List "mo:core/List";
import Types "../types";

module {
  public type State = {
    packages : List.List<Types.Package>;
    counter : { var nextId : Nat };
  };

  public func initState() : State {
    let state : State = {
      packages = List.empty<Types.Package>();
      counter = { var nextId = 1 };
    };
    // Seed default packages
    ignore create(state, { name = "Silver"; price = "Starting from ₹80,000"; features = ["Wedding Photography", "8 Hours Coverage", "300+ Edited Photos", "Online Gallery"]; highlighted = false });
    ignore create(state, { name = "Gold"; price = "Starting from ₹1,20,000"; features = ["Wedding Photography & Film", "12 Hours Coverage", "500+ Edited Photos", "Cinematic Highlights Film", "Online Gallery", "Engagement Session"]; highlighted = true });
    ignore create(state, { name = "Platinum"; price = "Custom Pricing"; features = ["Full Wedding Coverage", "2 Photographers", "Cinematic Wedding Film", "Pre-Wedding Shoot", "Drone Coverage", "Same Day Edit", "Photo Album"]; highlighted = false });
    state;
  };

  public func create(state : State, input : Types.PackageInput) : Types.Package {
    let id = state.counter.nextId;
    state.counter.nextId += 1;
    let pkg : Types.Package = {
      id;
      name = input.name;
      price = input.price;
      features = input.features;
      highlighted = input.highlighted;
    };
    state.packages.add(pkg);
    pkg;
  };

  public func getAll(state : State) : [Types.Package] {
    state.packages.toArray();
  };

  public func update(state : State, id : Types.PackageId, input : Types.PackageInput) : Bool {
    var found = false;
    state.packages.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with
          name = input.name;
          price = input.price;
          features = input.features;
          highlighted = input.highlighted;
        };
      } else { p };
    });
    found;
  };

  public func delete(state : State, id : Types.PackageId) {
    let updated = state.packages.filter(func(p) { p.id != id });
    state.packages.clear();
    state.packages.append(updated);
  };
};
