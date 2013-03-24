
 
var UMLDependency;
var UMLClassDiagram;
var UMLPackage;

module JSUML2 {
    
    
    class Node {
        setName(name:string);
        notifyChange();        
    }
    
    class Relation {
        
    }
    
    class Diagram {
        addElement(element);
        setName(name:string);
        _nodes:Node[];
        _relations:Relation[];
        
    }
    
    class UMLPackage extends Node {
        
    }
    
    class UMLClassDiagram extends Diagram {
        
    }
    
    class UMLDependency extends Relation {
        
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}