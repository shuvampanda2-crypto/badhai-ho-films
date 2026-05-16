import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types";

module {
  public type State = {
    testimonials : List.List<Types.Testimonial>;
    counter : { var nextId : Nat };
  };

  public func initState() : State {
    {
      testimonials = List.empty<Types.Testimonial>();
      counter = { var nextId = 1 };
    };
  };

  public func create(state : State, input : Types.TestimonialInput) : Types.Testimonial {
    let id = state.counter.nextId;
    state.counter.nextId += 1;
    let t : Types.Testimonial = {
      id;
      name = input.name;
      quote = input.quote;
      rating = input.rating;
      photoUrl = input.photoUrl;
      featured = input.featured;
      createdAt = Time.now();
    };
    state.testimonials.add(t);
    t;
  };

  public func getAll(state : State) : [Types.Testimonial] {
    state.testimonials.toArray();
  };

  public func getFeatured(state : State) : [Types.Testimonial] {
    state.testimonials.filter(func(t) { t.featured }).toArray();
  };

  public func update(state : State, id : Types.TestimonialId, input : Types.TestimonialInput) : Bool {
    var found = false;
    state.testimonials.mapInPlace(func(t) {
      if (t.id == id) {
        found := true;
        { t with
          name = input.name;
          quote = input.quote;
          rating = input.rating;
          photoUrl = input.photoUrl;
          featured = input.featured;
        };
      } else { t };
    });
    found;
  };

  public func delete(state : State, id : Types.TestimonialId) {
    let updated = state.testimonials.filter(func(t) { t.id != id });
    state.testimonials.clear();
    state.testimonials.append(updated);
  };
};
