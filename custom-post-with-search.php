<?php
/**
 * Plugin Name: Country Post React Plugin
 */


function generate_country() {
    $labels = array(
        'name'                  => 'Countries',
        'singular_name'         => 'Country',
    );
    $args = array(
        'label'                 => 'Country',
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'custom-fields', 'thumbnail' ),
        'taxonomies'            => array( 'category', 'post_tag' ),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'page',
        'show_in_rest'          => true,
        'rest_base'             => 'countries',
    );


    register_post_type( 'country', $args );
    
}


add_action( 'init', 'generate_country', 0 );




function get_country( WP_REST_Request $request ) {
	$parameters = $request->get_query_params();

	$number = -1;

	if($parameters['number']) {
		$number = $parameters['number'];
	}

	

	$posts = get_posts([
	  'post_type' => 'country',
	  'post_status' => 'publish',
	  'numberposts' => $number,
	  // 'order'    => 'ASC'
	]);

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
            'img' => get_the_post_thumbnail_url($ID, 'thumbnail'),
        );
	}

    $response = new WP_REST_Response($data, 200);
    
    return $response;
	
}


add_action( 'rest_api_init', function () {
	register_rest_route( 'react_api/v1', '/country', array(
    	'methods' => 'GET',
    	'callback' => 'get_country',
  	));
});


function countrypost_shortcode() {

	return '<div id="country-post-react" ></div>';
}

add_shortcode('country-post-react', 'countrypost_shortcode');

function custompost_load_assets() {
	
	$react_app_js  = plugin_dir_url( __FILE__ ) . 'custompostreactapp/build/static/js/all_in_one_file.js';
    $react_app_css = plugin_dir_url( __FILE__ ) . 'custompostreactapp/build/static/css/all_in_one_file.css';	
      
    // time stops stylesheet/js caching while in development, might want to remove later  
    $version = time();	
    wp_enqueue_script( 'custompost-react', $react_app_js, array(), $version, true );         
    wp_enqueue_style( 'custompost-react', $react_app_css, array(), $version );
}

add_action( 'wp_enqueue_scripts', 'custompost_load_assets' );