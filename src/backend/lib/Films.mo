import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types";

module {
  public type State = {
    films : List.List<Types.Film>;
    counter : { var nextId : Nat };
  };

  public func initState() : State {
    {
      films = List.empty<Types.Film>();
      counter = { var nextId = 1 };
    };
  };

  public func create(state : State, input : Types.FilmInput) : Types.Film {
    let id = state.counter.nextId;
    state.counter.nextId += 1;
    let film : Types.Film = {
      id;
      title = input.title;
      category = input.category;
      youtubeUrl = input.youtubeUrl;
      thumbnailUrl = input.thumbnailUrl;
      description = input.description;
      featured = input.featured;
      createdAt = Time.now();
    };
    state.films.add(film);
    film;
  };

  public func getAll(state : State) : [Types.Film] {
    state.films.toArray();
  };

  public func getById(state : State, id : Types.FilmId) : ?Types.Film {
    state.films.find(func(f) { f.id == id });
  };

  public func getFeatured(state : State) : [Types.Film] {
    state.films.filter(func(f) { f.featured }).toArray();
  };

  public func update(state : State, id : Types.FilmId, input : Types.FilmInput) : Bool {
    var found = false;
    state.films.mapInPlace(func(f) {
      if (f.id == id) {
        found := true;
        { f with
          title = input.title;
          category = input.category;
          youtubeUrl = input.youtubeUrl;
          thumbnailUrl = input.thumbnailUrl;
          description = input.description;
          featured = input.featured;
        };
      } else { f };
    });
    found;
  };

  public func delete(state : State, id : Types.FilmId) {
    let updated = state.films.filter(func(f) { f.id != id });
    state.films.clear();
    state.films.append(updated);
  };
};
