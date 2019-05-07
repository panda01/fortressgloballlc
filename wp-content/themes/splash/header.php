<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since 1.0.0
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<link href="https://fonts.googleapis.com/css?family=Lato:100,400,900" rel="stylesheet">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'twentynineteen' ); ?></a>

	<header id="masthead">
		<a href="#" class="logo">
			<img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/fortress_logo.png" />
		</a>

		<nav class="header_navigation" role="navigation" aria-label="Main Menu">
			<?php
			wp_nav_menu(array('theme_location' => 'top'));
			?>
		</nav><!-- .footer-navigation -->
	</header><!-- #masthead -->

	<main id="content" role="main" class="container">
