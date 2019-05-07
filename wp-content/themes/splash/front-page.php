<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since 1.0.0
 */

get_header();
?>
	<?php

	/* Start the Loop */
	while ( have_posts() ) : the_post();
	?>
	<div id="cover_image" class="title_overlay_wrapper">
		<?php
		$cover_img_url = get_field('cover_image');
		$cover_text = get_field('cover_text');
		?>
		<img class="img" src="<?= $cover_img_url ?>" />
		<h2 class="title"><?= $cover_text ?></h2>
	</div>
	<section id="whoweare" class="row">
		<div class="col-lg-4">
			<img class="img" src="<?= get_field('section_2_image') ?>" />
		</div>
		<div class="col-lg-8">
			<h1 class="overlay_title"><?= get_field('section_2_title') ?></h1>
			<div class="content">
				<?= get_field('section_2_content'); ?>
			</div>
		</div>
	</section>
	<section id="whatwedo" class="row">
		<h1 class="col-lg-12 title"><?= get_field('section_3_title'); ?></h1>
		<div class="col-lg-12 content"></div>
		<div class="row">
			<?php
				while(have_rows('info_section')): the_row();
			?>
				<div class="col-lg-6 info_square">
					<img class="img" src="<?php the_sub_field('image'); ?>" />
					<h4 class="title"><?php the_sub_field('title'); ?></h4>
					<div class="content"><?php the_sub_field('content'); ?></div>
				</div>
			<?php endwhile; ?>
		</div>
	</section>
	<section id="contactus" class="row">
		<div class="splash_image_wrapper title_overlay_wrapper title_right col-lg-12">
			<img class="img" src="<?php the_field('contact_us_primary_image'); ?>" />
			<h2 class="title"><?php the_field('contact_us_tagline'); ?></h2>
		</div>
		<h1 class="overlay_title col-lg-9"><?php the_field('contact_us_secondary_title'); ?></h1>
		<div class="contact_form_wrapper col-lg-6 offset-lg-1">
			<div class="content h4">
				<?= the_field('contact_form_content'); ?>
			</div>
		</div>
		<div class="col-lg-5">
			<img class="address_background_img" src="<?= the_field('contact_us_secondary_image'); ?>" />
		</div>
		<address class="contact_info_wrap col-lg-6 offset-lg-5">
			<?php the_field('address', 'option'); ?>
			<br />
			<a href="mailto:<?php the_field('email', 'option'); ?>"><?php the_field('email', 'option'); ?></a>
			<br />
			<a href="tel:<?php the_field('phone', 'option'); ?>"><?php the_field('phone', 'option'); ?></a>
		</address>
	</section>
	<?php
	endwhile; // End of the loop.
	?>

<?php
get_footer();
