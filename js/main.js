'use strict';

$(function () {

  $('#wrapper').show();
  $('#loader').slideUp().remove();

    var KEY_CODE,
      isHorizontal,
      // AvroParser instance
      avro,
      // Array of drafs
      drafts = [],
      // Candidate Window Selected Item Index
      selectedIndex,
      toggleLanguage,
      fetchAllDrafts,
      loadDraftId,
      currentDraftId,
      makeTitle,
      $editor = $('textarea'),
      $statusControl = $('#state'),
      $current,
      isBN = true,
      // Length of draft title in chars
      titleLength = 25,
      LS = window.localStorage,
      runningEvent = 0,
      selectedTpl = '<li class="cur" data-value="${name}"><a href="#">${name}</a></li>';

    KEY_CODE = {
    DOWN: 40,
    UP: 38,
    ESC: 27,
    TAB: 9,
    ENTER: 13,
    SPACE: 32,
    CTRL: 17,
    P: 80,
    N: 78
  };
  
    //Show incompatibily alert
  if (navigator.userAgent.match(/Android/i)){
    if (!LS.browserWarning){
      LS.browserWarning = 1;
      alert('AvroPad may not work as expected due to some bugs of Android. Ask Google to get their things right.');
    }
  }

  isHorizontal = function () {
    return (device.mobile() || device.tablet() || $(window).width() <= 800);
  }

  avro = new AvroPhonetic(
    function () {
      if (LS.AvroCandidateSelection) {
        return JSON.parse(LS.AvroCandidateSelection);
      } else {
        return {};
      }
    },
    function (cS) {
      LS.AvroCandidateSelection = JSON.stringify(cS);
    }
  );

  // Functions
  toggleLanguage = function () {
    isBN = !isBN;
    $(document.body).toggleClass('sys');
    $statusControl.prop('checked', isBN);
    runningEvent = 0;
  };

  fetchAllDrafts = function () {
    $('.drafts ul li a').each(function (index) {
      var data = '';
      if (LS['draft-' + index]) {
        data = JSON.parse(LS['draft-' + index]);
      }
      drafts[index] = data;
      $(this).text(makeTitle(data, index));
    });
  };
