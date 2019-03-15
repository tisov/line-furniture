$(document).ready(function() {
   
   new WOW().init();
   
  // Global variables
  let $window = $(window);
   
  // 01. Mobile Menu 
  function mobile_menu() {
    let menu_btn = $('.menu-btn'),
        main_menu = $('.desktop-menu .menu'),
        mobile_menu = $('.mobile-menu');
        
    // menu button animate, menu slide toggle
    menu_btn.on('click', function() {
      event.stopPropagation();
      $(this).toggleClass('active');
      
      $('.mobile-menu .menu').slideToggle('fast');
    });
    
    // close menu if target is not menu or menu button
    $(document).on('click', function() {
      let is_target_menu = function() {
        if (event.target.closest('.mobile-menu')) {
          return true;
        }
        return false;
      }
      is_target_menu();
      
      if (event.target !== menu_btn && 
          menu_btn.hasClass('active') &&     
          is_target_menu() == false) {    
            
        menu_btn.removeClass('active');
        mobile_menu.find('.drop-menu').slideUp('fast');
        mobile_menu.find('.drop-btn').html('+');
        $('.mobile-menu .menu').slideUp('fast');
        
      }
    });
    
    // clone desktop menu and add dropdown icon
    $(window).on('load', function() {
      main_menu.clone().appendTo(mobile_menu)
        .find('.has-dropdown').removeClass('active');
      mobile_menu.find('.has-dropdown > a')
        .after('<div class="drop-btn">+</div>');
    });
    
    // menu dropdown
    mobile_menu.on('click', function() {
      let el = $(event.target);
      // let drop_btn = $('.drop-btn');
      
      if (el.hasClass('drop-btn')) {
        el.next().slideToggle('fast', function() {
          if ($(this).css('display') == 'block') {
            $(this).prev('.drop-btn').html('-');
          } 
          else {
            $(this).prev('.drop-btn').html('+');
          }
        });
      }
    });
  }
  mobile_menu();
  
  // 02. Main Slider
  function slider_area() {
    $('.slider-wrap').owlCarousel({
      loop: true,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      smartSpeed: 2500,
      items: 1,
      nav: false,
      dots: true
    });
  }
  slider_area();
  
  // 03. Product Section
  function product_slider() {
    $('.product-slider').owlCarousel({
      loop: true,
      items: 5,
      nav: true,
      dots: false,
      navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
      margin: 30,
      responsive: {
        0:{
          items:1
        },
        420:{
          items:2
        },
        600:{
          items:3
        },
        800:{
          items:3
        },
        1024:{
          items:4
        },
        1200:{
          items:5
        }
      }
    });
  }
  product_slider();
    
  // 04. Blog Carousel
  $('.blog-carousel').owlCarousel({
    items: 3,
    margin: 15,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      800: {
        items: 3
      }
    }
  });
  
  // 05. Scroll Top
  function scroll_top() {
    let $scroll_top_btn = $('#scroll-top');
    
    $scroll_top_btn.on('click', function() {
      event.preventDefault();
      
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
    });
    
    $window.on('scroll', function() {
      if ($(this).scrollTop() >= 500) {
        $scroll_top_btn.css('display', 'block');    
      }
      else {
        $scroll_top_btn.css('display', 'none');
      }
    });
  }
  scroll_top();
  
  // Product Detail Page
  $('.product-image').slick({
    asNavFor: '.product-thumbnail',
    infinite: true,
    prevArrow: '<button type="button" class="slick-prev">&lsaquo;</button>',
    nextArrow: '<button type="button" class="slick-next">&rsaquo;</button>',
    rows: 0
  });
  
  $('.product-thumbnail').slick({
    asNavFor: '.product-image',
    infinite: true,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    centerPadding: '0px',
    rows: 0
  });
  
  // related product carousel
  $('.related-product-carousel').owlCarousel({
    items:4,
    mouseDrag: false,
    nav:false,
    margin: 15,
    navText : ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive:{
        0:{
            items:1,
            mouseDrag: true,
            nav:true
        },
        400:{
            items:2,
            mouseDrag: true,
            nav:true
        },
        600:{
            items:3,
            mouseDrag: true,
            nav:true
        },
        800:{
            items:3,
            mouseDrag: true,
            nav:true
        },
        1024:{
            items:4
        },
        1200:{
            items:4
        }
    }
  });
  
});


// google map
function initMap() {
  let map = new google.maps.Map(document.getElementById('g-map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
