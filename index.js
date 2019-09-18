/* eslint-disable indent */


function generateResults(resJson) {
	let results = [];
	if (resJson.length !== 0) {
		results = resJson.map(repo => {
		return `
				<h3>Name: ${repo.name}</h3>
			<p>URL:<a href="${repo.html_url}">${repo.html_url}</a></p>`;
	});
} else {
	results = '<h2>Sorry, no results found</h2>';
}
	displayResults(results);
}


function displayResults(results) {
	$('.results').empty();
	$('.results').append(results);
}

function getResults(searchTerm) {
  const baseURL = `https://api.github.com/users/${searchTerm}/repos` ;


  fetch(baseURL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error (res.statusText);
    })
    .then(resJson => generateResults(resJson))
    .catch(err => {
      $('#js-error').text(`something went wrong: ${err.message}`);
    });
}

function handleSearch() {
  $('#form').submit(function(event) {
    event.preventDefault();
		let searchTerm = $('.form_searchbar').val();
		$('#form').trigger('reset');
    getResults(searchTerm);
  });
}




function main() {
  handleSearch();
}

$(main);