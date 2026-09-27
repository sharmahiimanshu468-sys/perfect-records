import OQL "mo:caffeineai-oql";
import Types "types/inquiries";

module {
  public func _toRow(self : Types.ProjectType) : OQL.Value =
    #text(
      switch self {
        case (#videoEditing) "videoEditing";
        case (#posterDesign) "posterDesign";
        case (#fullTrackProduction) "fullTrackProduction";
        case (#devotionalSpiritual) "devotionalSpiritual";
        case (#customComposition) "customComposition";
        case (#mixingMastering) "mixingMastering";
        case (#other) "other";
      }
    );
};
