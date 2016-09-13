// will be used for utility js functions

// removes non alpha numeric and compacts whitespace to single space
function clean_string_no_special(input_object) {
    var input_string = input_object.value;

    //  remove all non alpha numeric
    var first_pass = input_string.replace(/[^a-zA-Z0-9_\ \.\\\#\-_\/]/g, "");

    input_object.value = first_pass;
}

// cleans the string and leaves no white space at all
function clean_string_no_space(input_object) {
    var input_string = input_object.value;

    //  remove all non alpha numeric
    var first_pass = input_string.replace(/[^a-zA-Z0-9_\ ]/g, "");
    var second_pass = first_pass.replace(/\s+/g, "_");
    var third_pass = second_pass.replace(/\s+$/, "");
    input_object.value = third_pass;
}

function embed_template() {

    var template_name = $('#template_autocomplete').val();

    var doc = jQuery(document.documentElement);
    doc.css('cursor', 'progress');

    var params = {
        "template_name" : template_name
    }

    var url = "/tools/embedTemplate/"

    var post = jQuery.post(url, params, function(response) {
        load_overlay(response);
    });

    post.fail(function() {
        alert('Could not perform request!');
    });

    post.always(function() {
        doc.css('cursor', '');
    });
}

function load_widget_configs(obj){
    console.log('loading widget config for ' + obj.value);
    console.log('loading widget config for ' + obj.id);

    var doc = jQuery(document.documentElement);
    doc.css('cursor', 'progress');

    var url = "/input_forms/loadWidgetConfig/"

    var params = {
        "widget_name": obj.value,
        "widget_id": obj.id
    }

    var post = jQuery.post(url, params, function(response) {
        load_overlay(response);
    });

    post.fail(function() {
        alert('Could not perform request!');
    });

    post.always(function() {
        doc.css('cursor', '');
    });
}

function load_widget_configs_manual(widget_id, widget_name){

    var doc = jQuery(document.documentElement);
    doc.css('cursor', 'progress');

    var url = "/input_forms/loadWidgetConfig/"

    var params = {
        "widget_name": widget_name,
        "widget_id": widget_id
    }

    var post = jQuery.post(url, params, function(response) {
        load_overlay(response);
    });

    post.fail(function() {
        alert('Could not perform request!');
    });

    post.always(function() {
        doc.css('cursor', '');
    });
}


function set_numeric_range_config(widget_id){

    console.log(widget_id);
    var config_element = jQuery('#' + widget_id + '_config');

    console.log('#' + widget_id + '_config');
    var lower = jQuery('#numeric_range_lower').val();
    var higher = jQuery('#numeric_range_higher').val();

    var widget_config = {
        "lower": lower,
        "higher": higher
    }

    var widget_config_text = JSON.stringify(widget_config, null, 0);
    config_element.val(widget_config_text);
    console.log(widget_config_text);
    console.log('all done');
    close_overlay();
}

function set_preload_list_config(widget_id){

    var config_element = jQuery('#' + widget_id + '_config');

    var template_name = jQuery('#template_autocomplete').val();
    var preload_list_key_name = jQuery('#preload_list_key_name').val();
    var preload_list_value_name = jQuery('#preload_list_value_name').val();

    var widget_config = {
        "template_name": template_name,
        "key_name": preload_list_key_name,
        "value_name": preload_list_value_name
    }

    var widget_config_text = JSON.stringify(widget_config, null, 0);
    config_element.val(widget_config_text);
    console.log(widget_config_text);
    console.log('all done');
    close_overlay();
}

function load_overlay(content) {

    var doc = $(document);
    var overlay = $("<div/>").attr("id", "overlay").addClass("overlay");
    $("body").append(overlay);

    overlay.append(content);

}

function close_overlay() {
    var overlay = $("#overlay");
    overlay.empty();
    overlay.removeClass("help-overlay");
    overlay.remove();
}