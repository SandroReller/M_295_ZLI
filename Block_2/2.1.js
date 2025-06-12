function verdoppeln(zahl, callback){
    const ergebnis =zahl * 2;
    callback(ergebnis);
};
verdoppeln(456, function(ergebnis) {
    console.log('Das Ergebnis ist:', ergebnis);
});

