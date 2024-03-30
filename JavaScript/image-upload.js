$(document).ready(function() {
    // Trigger file upload when image is clicked
    $('.upload-img-box img').click(function() {
        $('#imageUpload').click();
    });

    // Handle file upload
    $('#imageUpload').change(function() {
        var reader = new FileReader();

        reader.onload = function(e) {
            // Update the image source with the uploaded image
            $('#imagePreview').attr('src', e.target.result);
            $('#imagePreview').css('height', '100%');
            $('#imagePreview').css('width', '100%');
            $('.upload-img-box').hide();
            $('.result').show();

            // Create an img element with the selected image as the source
            var img = $('<img>').attr('src', e.target.result).css({'height': '100px', 'width': '115px'});

            // Add the img element to each li element
            $('.top-container li').each(function() {
                $(this).html(img.clone()); // Use clone to create a copy of the img element for each li
            });
        }

        // Read the uploaded file data
        reader.readAsDataURL(this.files[0]);
    });

    // Handle filter adjustments
    $('#grayscale, #sepia, #blur, #brightness, #contrast, #hue-rotate, #saturate, #invert, #opacity').on('input', function() {
        applyFilters();
    });

    // Handle li click
    $('.top-container li').click(function() {
        // Get the filters from the clicked li
        var filters = $(this).find('img').css('filter');

        // Split the filters into an array
        var filtersArray = filters.match(/(\w+\(.+?\))/g);

        // Update the filter inputs
        filtersArray.forEach(function(filter) {
            var filterName = filter.match(/(\w+)/)[0];
            var filterValue = filter.match(/\((.+?)\)/)[1];

            // Remove the units from the filter value
            filterValue = filterValue.replace(/%|px|deg/, '');

            // Update the corresponding input
            $('#' + filterName).val(filterValue);
        });

        // Apply the filters to the uploaded image
        applyFilters();
    });
});

function applyFilters() {
    var grayscale = $('#grayscale').val();
    var sepia = $('#sepia').val();
    var blur = $('#blur').val();
    var brightness = $('#brightness').val();
    var contrast = $('#contrast').val();
    var hueRotate = $('#hue-rotate').val();
    var saturate = $('#saturate').val();
    var invert = $('#invert').val();
    var opacity = $('#opacity').val();

    // Apply the filters to the images
    $('#imagePreview').css('filter', 'grayscale(' + grayscale + '%) sepia(' + sepia + '%) blur(' + blur + 'px) brightness(' + brightness + '%) contrast(' + contrast + '%) hue-rotate(' + hueRotate + 'deg) saturate(' + saturate + '%) invert(' + invert + '%) opacity(' + opacity + '%)');
}