class PetStoreSerializer < ActiveModel::Serializer
    # NOTE:
  # Attempt to figure out how to incorporate 'location'
  attributes :id, :name, :location
  # attributes :id, :name

  has_many :items
  has_many :users, through: :items

  has_one :location
  has_many :users, through: :location
end
