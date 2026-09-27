import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import ListEntity "mo:caffeineai-oql/ListEntity";
import Entity "mo:caffeineai-oql/Entity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import ProjectTypeValue "ProjectTypeValue";
import Types "types/inquiries";
import InquiriesMixin "mixins/inquiries-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let inquiries : List.List<Types.Inquiry>;
  let nextInquiryId : { var value : Nat };

  include InquiriesMixin(accessControlState, inquiries, nextInquiryId);

  include ApiDocMixin();

  include Expose({
    entities = [
      inquiries.toEntity("inquiry", "Inquiry", "id")
        .sample({
          id = 0;
          name = "";
          email = "";
          projectType = #other;
          message = "";
          createdAt = 0;
        })
        .controllerOnly()
        .build(),
    ];
  });
};
