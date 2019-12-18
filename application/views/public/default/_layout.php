<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$controller = $this->router->fetch_class();
$method = $this->router->fetch_method();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <title><?php echo !empty($heading_title) ? $heading_title : 'CMS' ?> | Apecsoft CMS</title>
  <link rel="icon"
        href="<?php echo !empty($this->settings['favicon']) ? getImageThumb($this->settings['favicon']) : base_url("/public/favicon.ico"); ?>"
        sizes="32x32">
  <link rel="icon"
        href="<?php echo !empty($this->settings['favicon']) ? getImageThumb($this->settings['favicon'], 32, 32) : base_url("/public/favicon.ico"); ?>"
        sizes="32x32">
  <link rel="icon"
        href="<?php echo !empty($this->settings['favicon']) ? getImageThumb($this->settings['favicon'], 192, 192) : base_url("/public/favicon.ico"); ?>"
        sizes="192x192">
  <link rel="apple-touch-icon-precomposed"
        href="<?php echo !empty($this->settings['favicon']) ? getImageThumb($this->settings['favicon'], 180, 180) : base_url("/public/favicon.ico"); ?>">
  <meta name="msapplication-TileImage"
        content="<?php echo !empty($this->settings['favicon']) ? getImageThumb($this->settings['favicon'], 270, 270) : base_url("/public/favicon.ico"); ?>">

  <link href="<?php echo base_url() ?>public/css/bootstrap.min.css" type="text/css" rel="stylesheet">
  <link href="<?php echo base_url() ?>public/fonts/font-awesome/css/font-awesome.min.css" type="text/css" rel="stylesheet">
  <link href="<?php echo base_url() ?>public/fonts/elegantIcon/elegantIcon.css" type="text/css" rel="stylesheet">
  <link href="<?php echo base_url() ?>public/css/animate.css" type="text/css" rel="stylesheet">
  <link href="<?php echo base_url() ?>public/css/owl.carousel.min.css" type="text/css" rel="stylesheet">
  <link href="<?php echo base_url() ?>public/css/fancybox.css" type="text/css" rel="stylesheet">
  <link href="<?php echo base_url() ?>public/css/slick.css" type="text/css" rel="stylesheet">
  <link href="<?php echo base_url() ?>public/css/main.css" type="text/css" rel="stylesheet">
  <!-- từ đây -->
  

</head>
<body >
<div class="wrap">
    <?php
      $this->load->view($this->template_path . '_header');
      echo !empty($main_content) ? $main_content : '';
      $this->load->view($this->template_path . '_footer');
    ?>
</div>

<?php $asset_js[] = 'js/jquery.js'; ?>


<?php $this->minify->js($asset_js);
echo $this->minify->deploy_js(); ?>

<?php echo !empty($this->settings['script_head']) ? $this->settings['script_head'] : '' ?>


<?php echo !empty($this->settings['script_body']) ? $this->settings['script_body'] : '' ?>
<!-- từ đây -->
  <!-- <script type="text/javascript">
    var controller = "<?php echo $controller; ?>";
    console.log(controller);
    $("nav.d-nav").find('li').click(function(){
      $("nav.d-nav").find('li').attr("class","");
      $(this).attr("class","active");
    })
  </script> -->


  <script src="<?php echo base_url() ?>public/js/jquery.js" type="text/javascript"></script>
  <script src="<?php echo base_url() ?>public/js/bootstrap.min.js" type="text/javascript"></script>
  <script src="<?php echo base_url() ?>public/js/owl.carousel.min.js" type="text/javascript"></script>
  <script src="<?php echo base_url() ?>public/js/slick.min.js" type="text/javascript"></script>
  <script src="<?php echo base_url() ?>public/js/wow.min.js" type="text/javascript"></script>
  <script src="<?php echo base_url() ?>public/js/scrollspy.js" type="text/javascript"></script>
  <script src="<?php echo base_url() ?>public/js/fancybox.js" type="text/javascript"></script>
  <script src="<?php echo base_url() ?>public/js/jquery.sticky-kit.js" type="text/javascript"></script>
  <script src="<?php echo base_url() ?>public/js/script.js" type="text/javascript"></script>
  <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAeERZGTMeCEHUw7dIEac2DPzJZUtv_PrU&callback=initMap">
  </script>
</body>
</html>