describe("Person", function() {
   var Dictionary = function() {};
   Dictionary.prototype.hello = function() { return "hello"; };
   Dictionary.prototype.world = function() { return "world"; };

   var Person = function() {};
   Person.prototype.sayHelloWorld = function(dict) { return dict.hello() + " " + dict.world(); };

   it('uses the dictionary to say "hello world"', function() {
      var dictionary = new Dictionary;
      var person = new Person;
      
      spyOn(dictionary, "hello"); // replace hello function with a spy
      spyOn(dictionary, "world"); // replace world function with another spy
      
      person.sayHelloWorld(dictionary);

      expect(dictionary.hello).toHaveBeenCalled();
      expect(dictionary.world).toHaveBeenCalled();
   });
   
   it('uses the dictionary to say "hello world"', function() {
      var dictionary = new Dictionary;
      var person = new Person;
      spyOn(person, "sayHelloWorld"); // replace hello world function with a spy
      person.sayHelloWorld(dictionary);
      expect(person.sayHelloWorld).toHaveBeenCalledWith(dictionary);
   });   
   
   it('uses the dictionary to say "hello world"', function() {
      var dictionary = new Dictionary;
      var person = new Person;
      
      spyOn(dictionary, "hello").andCallThrough(); // allow the call to go through the spy
      spyOn(dictionary, "world").andCallThrough(); // allow the call to go through the spy
      
      var result = person.sayHelloWorld(dictionary);
      
      expect(result).toEqual("hello world"); // not possible without calling through
      expect(dictionary.hello).toHaveBeenCalled();
      expect(dictionary.world).toHaveBeenCalled();
   });
   
   it("can give a French hello", function() {
      var dictionary = new Dictionary;
      var person = new Person;

      // mock dictionary.hello function to return "bonjour"
      spyOn(dictionary, "hello").andReturn("bonjour"); 
      
      var result = person.sayHelloWorld(dictionary);
      expect(result).toEqual("bonjour world");
   });
   
   it("can call a fake function", function() {
      var fakeHello = function() {
         console.log('fake'); 
         return "hello";
      };
      var dictionary = new Dictionary();
      spyOn(dictionary, "hello").andCallFake(fakeHello);
      dictionary.hello(); // does an alert
   });
   
   it("can create a new a spy function", function() {
      var person = new Person();
      
      person.getName = jasmine.createSpy("Name spy");
      /* or: 
         jasmine.createSpy("Name spy").andReturn("James Bond");
         jasmine.createSpy("Name spy").andCallFake(function() {
            alert("I am also a spy! Ha ha!");
            return "Evan Hahn";
         });
      */
      
      person.getName();
      expect(person.getName).toHaveBeenCalled();
   });
});
