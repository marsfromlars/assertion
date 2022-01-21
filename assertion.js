class Result {
    constructor( expression, message, result ) {
        this.expression = expression
        this.message = message
        this.result = result
    }
}

class Results {
    results = []
    add( result ) {
        this.results.push( result )
    }
}

function getResults() {
    if( !document.results ) {
        document.results = new Results()
    }
    return document.results
}

function assert( expression, message ) {

    let evalResult = eval( expression )
    getResults().add( new Result( expression, message, evalResult ) )
    
}

function printResults( targetEl ) {

    targetEl = targetEl ? targetEl : document.body

    let table = document.createElement( 'table'  )
    table.setAttribute( 'border', '1' )
    targetEl.appendChild( table )

    let tr = document.createElement( 'tr' )
    table.appendChild( tr )
    let td = document.createElement( 'th' )
    td.innerHTML = 'Result'
    tr.appendChild( td )
    td = document.createElement( 'th' )
    td.innerHTML = 'Expression'
    tr.appendChild( td )
    td = document.createElement( 'th' )
    td.innerHTML = 'Message'
    tr.appendChild( td )

    getResults().results.forEach( result => {
        let tr = document.createElement( 'tr' )
        tr.setAttribute( 'class', result.result ? 'success' : 'fail' )
        table.appendChild( tr )
        let td = document.createElement( 'td' )
        td.innerHTML = result.result ? 'OK' : 'Failure'
        tr.appendChild( td )
        td = document.createElement( 'td' )
        td.innerHTML = result.expression ? result.expression : '-'
        tr.appendChild( td )
        td = document.createElement( 'td' )
        td.innerHTML = result.message ? result.message : '-'
        tr.appendChild( td )
    })

} 
