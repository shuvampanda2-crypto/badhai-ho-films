import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types";

module {
  public type State = {
    images : List.List<Types.GalleryImage>;
    counter : { var nextId : Nat };
  };

  public func initState() : State {
    {
      images = List.empty<Types.GalleryImage>();
      counter = { var nextId = 1 };
    };
  };

  public func create(state : State, input : Types.GalleryImageInput) : Types.GalleryImage {
    let id = state.counter.nextId;
    state.counter.nextId += 1;
    let image : Types.GalleryImage = {
      id;
      url = input.url;
      alt = input.alt;
      caption = input.caption;
      category = input.category;
      displayOrder = input.displayOrder;
      createdAt = Time.now();
    };
    state.images.add(image);
    image;
  };

  public func getAll(state : State) : [Types.GalleryImage] {
    state.images.toArray();
  };

  public func getByCategory(state : State, category : Text) : [Types.GalleryImage] {
    state.images.filter(func(img) { img.category == category }).toArray();
  };

  public func update(state : State, id : Types.GalleryImageId, input : Types.GalleryImageInput) : Bool {
    var found = false;
    state.images.mapInPlace(func(img) {
      if (img.id == id) {
        found := true;
        { img with
          url = input.url;
          alt = input.alt;
          caption = input.caption;
          category = input.category;
          displayOrder = input.displayOrder;
        };
      } else { img };
    });
    found;
  };

  public func delete(state : State, id : Types.GalleryImageId) {
    let updated = state.images.filter(func(img) { img.id != id });
    state.images.clear();
    state.images.append(updated);
  };
};
