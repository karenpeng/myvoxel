module.exports = function (materialIndex) {

  $('.pic').click(function () {
    var id = $(this).attr('id');
    var i = id.replace('material', '');
    materialIndex = i;
    $(this).css('border', "5px ridge #ddd");
    console.log($(this).siblings())
    $('.pic').not(this).css('border', "5px ridge #999");
  });

  $('#material0').css('border', "5px ridge #ddd");

}