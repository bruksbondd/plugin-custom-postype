<?php
/**
 * @package Country_post_type
 * @version 2.8
 */
/*
Plugin Name: Country Post Type [country-post]
Plugin URI: http://wordpress.org/extend/plugins/#
Description: This is an custom post type with shortcode [country-post]
Author: Bruks Bond
Version: 2.8
Author URI: https://mintsplash.net/
*/


function generate_country() {
    $labels = array(
        'name'                  => 'Countries',
        'singular_name'         => 'Country',
    );
    $args = array(
        'label'                 => 'Country',
        'labels'                => $labels,
        'publicly_queryable' => true, 
        'show_ui' => true, 
        'query_var' => true, 
        'rewrite' => array( 'slug' => 'country', 'with_front'=> false ), 
        'capability_type' => 'post', 
        'hierarchical' => true,
        'has_archive' => true,  
        'menu_position' => null, 
        'supports'              => array( 'title', 'editor', 'custom-fields', 'thumbnail' ),
        'taxonomies'            => array( 'regions' ),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'page',
        'show_in_rest'          => true,
        'rest_base'             => 'countries',
    );


    register_post_type( 'country', $args );


    register_taxonomy( 'regions', array('country'), array(
        'hierarchical' => true, 
        'label' => 'Regions', 
        'singular_label' => 'Region',
        'show_ui' => true,  
        'show_in_menu' => true,
        'show_in_rest' => true,
        'show_admin_column' => true,
        'show_in_quick_edit' => true,
        'rewrite' => array( 'slug' => 'regions', 'with_front'=> false )
        )
    );

    register_taxonomy_for_object_type( 'regions', 'country' );
    
}


add_action( 'init', 'generate_country', 0 );




function get_country( WP_REST_Request $request ) {
	$parameters = $request->get_query_params();

	$number = -1;
    $region = '';

	if($parameters['number']) {
		$number = $parameters['number'];
	}

    if($parameters['region']) {
	    $region = $parameters['region'];
    }

    $arr = array(
        'post_type' => 'country',
        // 'cat'         => $region,
        'post_status' => 'publish',
        'numberposts' => $number,
    );

    if($region) {
        $arr_taxonomy = array(
            'tax_query' => array(
                array(
                    'taxonomy' => 'regions',
                    'field' => 'term_id',
                    'terms'    =>  $region
                ),
            ));
            $arr = array_merge($arr, $arr_taxonomy);

    }



	$posts = get_posts($arr);

	if($parameters['search']) {
		$args = array("post_type" => "country", "s" => $parameters['search']);
		$posts = get_posts( $args );
	}

	//return $posts;
	$data = array();
	foreach ($posts as $post){
		$ID = $post -> ID;
 		$data[] = array(
            'id'   		=> $ID,
            'content' 	=> $post -> post_content,
            'title'     => $post -> post_title,
            'slug'          => $slug = $post->post_name,
            'link' => get_permalink($ID),
            'img' => get_the_post_thumbnail_url($ID, 'full'),
            'currency' => get_field( 'currency', $ID),
            'capital' => get_field( 'capital', $ID),
            'official_language_' => get_field('official_language_', $ID),
            
        );
	}

    $response = new WP_REST_Response($data, 200);
    
    return $response;
}


function get_region( WP_REST_Request $request ) {
    $posts = get_posts([
        'post_type' => 'country',
        'post_status' => 'publish',
        'taxonomy' => 'regions'
        //'categories' => 'regions'
        // 'order'    => 'ASC'
      ]);

    $data = array();

    //$cats = get_categories($posts);

    $cats = get_categories( array(
        'orderby' => 'name',
        'order'   => 'ASC',
        'taxonomy' => 'regions'
    ) );
    foreach($cats as $cat) {
        $data[] = array(
            'id'    => $cat -> term_id,
            'name' 	=> $cat -> name,
        );
    }

    $response = new WP_REST_Response( $data , 200);
    
    return $response;
}



add_action( 'rest_api_init', function () {
	register_rest_route( 'react_api/v1', '/country', array(
    	'methods' => 'GET',
    	'callback' => 'get_country',
  	));

    register_rest_route( 'react_api/v1', '/region', array(
    	'methods' => 'GET',
    	'callback' => 'get_region',
  	));
});


function countrypost_shortcode() {
	return '<div id="country-post-react" ></div>';
}

add_shortcode('country-post', 'countrypost_shortcode');

function custompost_load_assets() {
	
	$react_app_js  = plugin_dir_url( __FILE__ ) . 'custompostreactapp/build/static/js/all_in_one_file.js';
    $react_app_css = plugin_dir_url( __FILE__ ) . 'custompostreactapp/build/static/css/all_in_one_file.css';	
      
    // time stops stylesheet/js caching while in development, might want to remove later  
    $version = time();	
    wp_enqueue_script( 'custompost-react', $react_app_js, array(), $version, true );         
    wp_enqueue_style( 'custompost-react', $react_app_css, array(), $version );
}

add_action( 'wp_enqueue_scripts', 'custompost_load_assets' );