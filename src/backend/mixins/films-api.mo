import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import FilmsLib "../lib/Films";
import Types "../types";

mixin (
  accessControlState : AccessControl.AccessControlState,
  filmsState : FilmsLib.State,
) {
  // Public: read all films
  public query func getFilms() : async [Types.Film] {
    FilmsLib.getAll(filmsState);
  };

  // Public: get featured films
  public query func getFeaturedFilms() : async [Types.Film] {
    FilmsLib.getFeatured(filmsState);
  };

  // Public: get a film by id
  public query func getFilm(id : Types.FilmId) : async ?Types.Film {
    FilmsLib.getById(filmsState, id);
  };

  // Admin-only: create a film
  public shared ({ caller }) func createFilm(input : Types.FilmInput) : async Types.Film {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    FilmsLib.create(filmsState, input);
  };

  // Admin-only: update a film
  public shared ({ caller }) func updateFilm(id : Types.FilmId, input : Types.FilmInput) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    FilmsLib.update(filmsState, id, input);
  };

  // Admin-only: delete a film
  public shared ({ caller }) func deleteFilm(id : Types.FilmId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    FilmsLib.delete(filmsState, id);
  };
};
