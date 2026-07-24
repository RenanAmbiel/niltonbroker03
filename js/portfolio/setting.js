jQuery(document).ready(function ($) {
  if (jQuery().quicksand) {
    var $data = $(".portfolio").clone();

    var selectedType = "all";
    var selectedBairro = "all-bairro";

    // Função que filtra os dados combinando tipo e bairro
    function filterItems() {
      var $filteredData = $data.find(".item-thumbs");

      if (selectedType !== "all") {
        $filteredData = $filteredData.filter(
          '[data-type="' + selectedType + '"]',
        );
      }
      if (selectedBairro !== "all-bairro") {
        $filteredData = $filteredData.filter(
          '[data-bairro="' + selectedBairro + '"]',
        );
      }

      $(".portfolio").quicksand(
        $filteredData,
        {
          duration: 600,
          adjustHeight: "auto",
        },
        function () {
          $(".fancybox").fancybox({
            padding: 0,
            beforeShow: function () {
              this.title = $(this.element).attr("title");
              this.title =
                "<h4>" +
                this.title +
                "</h4>" +
                "<p>" +
                $(this.element).parent().find("img").attr("alt") +
                "</p>";
            },
            helpers: { title: { type: "inside" } },
          });
        },
      );
    }

    // Filtra por tipo
    $(".filter")
      .eq(0)
      .find("li")
      .click(function (e) {
        e.preventDefault();
        $(".filter").eq(0).find("li").removeClass("active");
        $(this).addClass("active");
        selectedType = $(this).attr("class").split(" ")[0];
        filterItems();
      });

    // Filtra por bairro
    $(".filter")
      .eq(1)
      .find("li")
      .click(function (e) {
        e.preventDefault();
        $(".filter").eq(1).find("li").removeClass("active");
        $(this).addClass("active");
        selectedBairro = $(this).attr("class").split(" ")[0];
        filterItems();
      });
  }
});
