import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import InquiryLib "lib/Inquiries";
import FilmsLib "lib/Films";
import GalleryLib "lib/Gallery";
import TestimonialsLib "lib/Testimonials";
import PackagesLib "lib/Packages";
import InquiryApi "mixins/inquiry-api";
import FilmsApi "mixins/films-api";
import GalleryApi "mixins/gallery-api";
import TestimonialsApi "mixins/testimonials-api";
import PackagesApi "mixins/packages-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let inquiryState = InquiryLib.initState();
  let filmsState = FilmsLib.initState();
  let galleryState = GalleryLib.initState();
  let testimonialsState = TestimonialsLib.initState();
  let packagesState = PackagesLib.initState();

  include InquiryApi(accessControlState, inquiryState);
  include FilmsApi(accessControlState, filmsState);
  include GalleryApi(accessControlState, galleryState);
  include TestimonialsApi(accessControlState, testimonialsState);
  include PackagesApi(accessControlState, packagesState);
};

