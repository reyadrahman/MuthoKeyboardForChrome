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

  makeTitle = function (content, index) {
    if (!!content){
      content = content.trim().split('\n')[0];
    } else {
      content = '';
    }

    
        if (content && content.trim().length) {
      if (content.length <= titleLength) return content;
      if (content[titleLength] === ' ') {
        return content.substring(0, titleLength);
      } else {
        var pos = content.lastIndexOf(' ', titleLength);
        return content.substring(0, pos);
      }
    } else {
      return 'Draft ' + (index + 1);
    }
  };
  
  loadDraftId = function (id) {
    $editor.val(drafts[id]);
    $editor.trigger('autosize.resize').focus();
  };
  

  // Event Handlers
  $(document).on('keydown', function (e){
    if(e.ctrlKey && [190,110].indexOf(e.keyCode) !== -1) {
      e.preventDefault();
      toggleLanguage();
    }
  });

  $statusControl.on('change', function () {
    isBN = $(this).is(':checked');
  });

  $('.drafts ul').on('click', 'li', function (e) {
    e.preventDefault();
    $('.drafts ul li.active').removeClass('active');
    $(this).addClass('active');
    $current = $(this).find('a');

    currentDraftId = $(this).index();
    loadDraftId(currentDraftId);
  });

   // Init
  fetchAllDrafts();
  
  // Load the first draft
  $('.drafts ul li:first a').trigger('click');

  // The TextArea
  $editor
  .autosize()
  .prop('disabled', false)
  .atwho({
    at: '',
    data: {},
    tpl: '<li data-value="${name}"><a href="#">${name}</a></li>',
    start_with_space: false,
    limit: 11,
    highlight_first: false,
    callbacks: {
      //just match everything baby :3
      matcher: function (flag, subtext) {
        if (!isBN) return null; // always return null when user selects english
        var res = subtext.match(/\s?([^\s]+)$/);
        // console.log(subtext, res);
        if (res == null) return null;
        var bnregex = /[\u0980-\u09FF]+$/;
        if (bnregex.exec(res[1])) return null;
        return res[1];
      },
      // main work is done here
      filter: function (query, data, search_key) {
        // console.log(query, data, search_key);
        var bnarr = avro.suggest(query);

        bnarr.words = bnarr.words.slice(0,10);
        if (avro.candidate(query) === query) {
          bnarr.prevSelection = bnarr.words.length;
        }
        bnarr.words.push(query);

        selectedIndex = 0;
        return $.map(bnarr.words, function (value, i) {
          if (i === bnarr.prevSelection) selectedIndex = i;
          return {
            id: i,
            name: value
          };
        });
      },
