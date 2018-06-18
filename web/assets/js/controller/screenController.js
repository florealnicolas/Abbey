function showFirstPage() {

  $("#workspace > .card").hide();
  $("#story-page").show();

  $("#story").addClass("active");

};

function showPage(e) {
  e.preventDefault();

  $('#workspace > .card').hide();
  $('#main a').removeClass("active");

  let page = $(this)[0].id + "-page";

  $('#' + page).show();
  $(this).addClass("active");

  if (page === "jobs") {
    const activePage = $("#secondaryJob > .active").text();
    $('.' + activePage.toLowerCase()).show();
  }

  if (page === "brew") {
    const activePage = $("#secondaryBrew > .active").text();
    $('.' + activePage.toLowerCase()).show();
  }
}

function showJobSubpage(e, game) {
  e.preventDefault();

  let prevPage = $("#secondaryJob > .active")[0];

  if (prevPage != undefined) {
    prevPage = prevPage.id.split("-")[0]
  }

  const currentPage = $(this)[0].id.split("-")[0];

  if (prevPage !== currentPage) {

    $('#jobs-page .subpage').hide();
    $('#secondaryJob .nav-link').removeClass("active");

    $('#' + currentPage + "-subpage").show();
    $(this).addClass("active");
  }
};

function showDefaultJobSubPage() {
  $("#jobs-page .subpage").hide();

  $("#fields-subnav").addClass('active');
  $("#fields-subpage").show();
};

function showBrewSubpage(e, game) {
  e.preventDefault();

  let prevPage = $("#secondaryBrew > .active")[0];

  if (prevPage != undefined) {
    prevPage = prevPage.id.split("-")[0]
  }

  const currentPage = $(this)[0].id.split("-")[0];

  if (prevPage != currentPage) {

    $('#brew-page .subpage').hide();
    $('#secondaryBrew .nav-link').removeClass("active");

    $('#' + currentPage + '-subpage').show();
    $(this).addClass("active");
  }

};

function showDefaultBrewSubPage() {
  $("#brew-page .subpage").hide();

  $("#overview-subnav").addClass('active');
  $("#overview-subpage").show();
};
