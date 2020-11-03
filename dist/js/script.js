$(document).ready(function(){
    $('.carousel__slider').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev_arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next_arrow.svg"></button>'
    });


    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    

    function toggleSlide (item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    };

    toggleSlide('.catalog-item__details');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function() {
       $('#consultation, .overlay').fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('#consultation, .overlay, #order, #thanks').fadeOut();
    });

    $('.catalog-item__btn').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__subheader').text($('.catalog-item__name').eq(i).text());
            $('#order, .overlay').fadeIn();
        });
    });

    $('#form-consultation, #form-order').validate({
        rules: {
          name: "required",
          email: {
                required: true,
                email: true
          },
          phone: {
                required: true,
                minlength: 12
          }
        },
        messages: {
            name: {
                required: "Вы не ввели имя, мы хотим называть вас по имени 😊",
            },
            email: {
                required: "Вы не ввели email адрес, а если недозвонимся?",
                email: "Это не email. Введите, пожалуйста, вашу почту"
            },
            phone: {
                required: "Без телефона мы не сможем вам позвонить 😞",
                minlength: jQuery.validator.format("Введен неверный формат телефона, введите {0} символов")
            }
        }
    }); 

    function validateForm (form) {
        $(form).validate({
            rules: {
              name: "required",
              email: {
                    required: true,
                    email: true
              },
              phone: {
                    required: true,
                    minlength: 12
              }
            },
            messages: {
                name: {
                    required: "Вы не ввели имя, мы хотим называть вас по имени 😊",
                },
                email: {
                    required: "Вы не ввели email адрес, а если недозвонимся?",
                    email: "Это не email. Введите, пожалуйста, вашу почту"
                },
                phone: {
                    required: "Без телефона мы не сможем вам позвонить 😞",
                    minlength: jQuery.validator.format("Введен неверный формат телефона, введите {0} символов")
                }
            }
        });
    };

    validateForm ("#form-consultation");
    validateForm ("#form-order");
    validateForm (".consultation .forms");

    $("input[name=phone]").mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("imput").val("");

            $('form').trigger('reset');
        });
        return false;
    })

    //smooth scroll and page up

    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.page-up').fadeIn()
        } else {
            $('.page-up').fadeOut()
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

  });