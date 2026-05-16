module {
  public type InquiryId = Nat;
  public type FilmId = Nat;
  public type GalleryImageId = Nat;
  public type TestimonialId = Nat;
  public type PackageId = Nat;

  public type FilmCategory = {
    #engagement;
    #weddingHighlights;
    #coupleTeaser;
    #reel;
  };

  public type ContactInquiry = {
    id : InquiryId;
    name : Text;
    email : Text;
    phone : Text;
    eventDate : Text;
    message : Text;
    packageInterest : Text;
    createdAt : Int;
  };

  public type Film = {
    id : FilmId;
    title : Text;
    category : FilmCategory;
    youtubeUrl : Text;
    thumbnailUrl : Text;
    description : Text;
    featured : Bool;
    createdAt : Int;
  };

  public type GalleryImage = {
    id : GalleryImageId;
    url : Text;
    alt : Text;
    caption : Text;
    category : Text;
    displayOrder : Nat;
    createdAt : Int;
  };

  public type Testimonial = {
    id : TestimonialId;
    name : Text;
    quote : Text;
    rating : Nat;
    photoUrl : Text;
    featured : Bool;
    createdAt : Int;
  };

  public type Package = {
    id : PackageId;
    name : Text;
    price : Text;
    features : [Text];
    highlighted : Bool;
  };

  // Input types (no id, no createdAt — caller provides data)
  public type InquiryInput = {
    name : Text;
    email : Text;
    phone : Text;
    eventDate : Text;
    message : Text;
    packageInterest : Text;
  };

  public type FilmInput = {
    title : Text;
    category : FilmCategory;
    youtubeUrl : Text;
    thumbnailUrl : Text;
    description : Text;
    featured : Bool;
  };

  public type GalleryImageInput = {
    url : Text;
    alt : Text;
    caption : Text;
    category : Text;
    displayOrder : Nat;
  };

  public type TestimonialInput = {
    name : Text;
    quote : Text;
    rating : Nat;
    photoUrl : Text;
    featured : Bool;
  };

  public type PackageInput = {
    name : Text;
    price : Text;
    features : [Text];
    highlighted : Bool;
  };
};
