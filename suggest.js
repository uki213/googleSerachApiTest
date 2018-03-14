$(() => {
    const API_KEY = '';
    const CX = '000000000000000000000:aaaaaaaaaaa';
    // const API_URL = 'https://www.googleapis.com/customsearch/v1';
    const API_URL = 'dummy.json'; // 実際には上記URLを使用する
    let timerId;

    changeKeyWord = (e) => {
      let inputWord = $(e.target).val();
      clearTimeout(timerId);

      if (inputWord !== '') {
        timerId = setTimeout(() => {
          loadApi(inputWord);
        }, 1 * 5000);
      }
    }

    loadApi = (searchWord) => {
      let params = new URLSearchParams(        {
        key: API_KEY,
        cx: CX,
        q: searchWord
      });

      fetch(API_URL + '?' + params, {
        method: 'get'
      }).then(response => {
        return response.text();
      }).then(body => {
        suggestRender(body);
      })
    }

    suggestRender = (response) => {
      let obj = JSON.parse(response);
      let items = obj.items;
      let suggestHtml = '';

      $('.suggest ul *').remove();

      items.forEach(item => {
        suggestHtml += `<li><a href="${item.link}">${item.title}</a></li>`;
      });
      
      $('.suggest ul').append(suggestHtml);
    }

    $('#content').on('input', changeKeyWord);
  });