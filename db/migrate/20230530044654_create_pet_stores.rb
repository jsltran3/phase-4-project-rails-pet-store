class CreatePetStores < ActiveRecord::Migration[6.1]
  def change
    create_table :pet_stores do |t|
      t.string :name

      t.timestamps
    end
  end
end
